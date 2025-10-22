import { NextRequest, NextResponse } from "next/server";

// 국립국어원 API를 통한 단어 검증 함수 (서버 사이드에서 실행)
async function validateWordWithDictAPI(word: string): Promise<boolean> {
  try {
    const apiKey = process.env.KOREAN_DICT_API_KEY;

    if (!apiKey) {
      console.warn('국립국어원 API 키가 설정되지 않았습니다.');
      return false;
    }

    // 국립국어원 API 문서에 따른 정확한 요청 파라미터 (num은 10~100)
    const url = `https://krdict.korean.go.kr/api/search?key=${apiKey}&q=${encodeURIComponent(word)}&start=1&num=10&advanced=y&target=1&method=exact&pos=1`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/xml, text/xml',
        'Content-Type': 'application/xml; charset=utf-8'
      }
    });

    if (!response.ok) {
      console.warn('국립국어원 API 호출 실패:', response.status);
      return false;
    }

    const xmlText = await response.text();

    if (xmlText.includes('<error>')) {
      console.warn('국립국어원 API 오류 응답:', xmlText);
      return false;
    }

    // word 태그가 있는지 확인 (단어가 사전에 존재하는지)
    const wordRegex = new RegExp(`<word[^>]*>${word}</word>`, 'i');
    const isValid = wordRegex.test(xmlText);

    return isValid;

  } catch (error) {
    console.error('국립국어원 API 호출 오류:', error);
    return false;
  }
}

// 한국어 단어의 마지막 글자 추출 함수 (끝말잇기 규칙에 맞게)
function getLastChar(word: string): string {
  if (!word || typeof word !== 'string') return '';

  // 단순히 마지막 글자만 반환 (받침 포함)
  // 예: "책" → "책", "공부" → "부", "야구" → "구"
  return word.charAt(word.length - 1);
}

// 한국어 단어 검증 함수
function isValidKoreanWord(word: string): boolean {
  if (!word || typeof word !== 'string') return false;

  // 2글자 이상 10글자 이하
  if (word.length < 2 || word.length > 10) return false;

  // 한글만 허용
  if (!/^[가-힣]+$/.test(word)) return false;

  // 반복되는 글자만 있는 단어 제외 (ㅋㅋㅋ 등)
  if (/^(.)\1+$/.test(word)) return false;

  return true;
}


// 국립국어원 API를 통한 단어 검색 함수
async function searchWordsFromDictAPI(startChar: string): Promise<string[]> {
  try {
    const apiKey = process.env.KOREAN_DICT_API_KEY;

    if (!apiKey) {
      console.warn('국립국어원 API 키가 설정되지 않았습니다.');
      return [];
    }

    // 해당 글자로 시작하는 명사 단어들 검색 (국립국어원 API 문서에 따라)
    const url = `https://krdict.korean.go.kr/api/search?key=${apiKey}&q=${encodeURIComponent(startChar)}&req_type=json&start=1&num=50&advanced=y&target=1&method=start&pos=1&sort=dict`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    if (!response.ok) {
      console.warn('국립국어원 API 호출 실패:', response.status);
      return [];
    }

    const xmlText = await response.text();

    if (xmlText.includes('<error>')) {
      console.warn('국립국어원 API 오류 응답');
      return [];
    }

    // XML에서 word 태그들을 추출
    const wordMatches = xmlText.match(/<word[^>]*>([^<]+)<\/word>/gi) || [];
    const words = wordMatches.map(match => {
      const wordMatch = match.match(/<word[^>]*>([^<]+)<\/word>/i);
      return wordMatch ? wordMatch[1].trim() : null;
    }).filter(word => word && word.length >= 2 && word.length <= 10 && /^[가-힣]+$/.test(word));

    // 중복 제거 및 null 값 필터링
    return [...new Set(words.filter(word => word !== null))] as string[];

  } catch (error) {
    console.error('국립국어원 API 호출 오류:', error);
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { message, usedWords } = await req.json();

  if (!message || typeof message !== "string" || message.trim() === "") {
    return NextResponse.json({ error: "메시지를 입력하세요." }, { status: 400 });
  }

  // 입력 단어 검증 (국립국어원 API 사용)
  const isValid = await isValidKoreanWord(message);
  if (!isValid) {
    return NextResponse.json({ error: "올바른 한국어 단어가 아닙니다." }, { status: 400 });
  }

  // 실제 마지막 글자 추출
  const actualLastChar = getLastChar(message);

  // 사용된 단어 목록 정리
  const usedWordsList = Array.isArray(usedWords) ? usedWords.map(word => word.trim()) : [];

  // 국립국어원 API에서 단어 검색
  let availableWords: string[] = [];

  try {
    const apiWords = await searchWordsFromDictAPI(actualLastChar);
    if (apiWords.length > 0) {
      availableWords = apiWords;
    } else {
      return NextResponse.json({ text: "패배!" });
    }
  } catch {
    return NextResponse.json({ text: "패배!" });
  }

  if (availableWords.length === 0) {
    return NextResponse.json({ text: "패배!" });
  }

  // 사용되지 않은 단어들 필터링
  const unusedWords = availableWords.filter(word => !usedWordsList.includes(word));

  if (unusedWords.length === 0) {
    return NextResponse.json({ text: "패배!" });
  }

  // 랜덤하게 단어 선택
  const selectedWord = unusedWords[Math.floor(Math.random() * unusedWords.length)];

  return NextResponse.json({ text: selectedWord });
}

// 단어 검증 API 엔드포인트
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get('word');
  const action = searchParams.get('action');

  // 힌트 요청인 경우
  if (action === 'hint') {
    const lastChar = searchParams.get('lastChar');
    if (!lastChar) {
      return NextResponse.json({ error: "마지막 글자를 입력하세요." }, { status: 400 });
    }

    try {
      const hintWords = await searchWordsFromDictAPI(lastChar);
      // 사용된 단어들을 제외하고 최대 12개 반환
      const availableHints = hintWords.slice(0, 12);
      return NextResponse.json({ hintWords: availableHints });
    } catch {
      return NextResponse.json({ error: "힌트 단어를 가져올 수 없습니다." }, { status: 500 });
    }
  }

  // 단어 검증인 경우
  if (!word) {
    return NextResponse.json({ error: "단어를 입력하세요." }, { status: 400 });
  }

  // 기본 검증 먼저
  if (word.length < 2 || word.length > 10) {
    return NextResponse.json({ isValid: false, reason: "단어 길이는 2글자 이상 10글자 이하여야 합니다." });
  }

  if (!/^[가-힣]+$/.test(word)) {
    return NextResponse.json({ isValid: false, reason: "한글 단어만 입력할 수 있습니다." });
  }

  if (/^(.)\1+$/.test(word)) {
    return NextResponse.json({ isValid: false, reason: "반복되는 글자만 있는 단어는 사용할 수 없습니다." });
  }

  // 국립국어원 API로 실제 검증
  const isValidInDict = await validateWordWithDictAPI(word);

  if (isValidInDict) {
    return NextResponse.json({ isValid: true });
  } else {
    return NextResponse.json({ isValid: false, reason: "등록되지 않은 단어입니다." });
  }
}
