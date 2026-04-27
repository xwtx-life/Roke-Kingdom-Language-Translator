// 即使主要使用字体渲染，我们也保留 Unicode 映射以兼容从外部粘贴的符号
export const RUNE_TO_ALPHA: Record<string, string> = {
  '\u16AB': 'A', '\u16D2': 'B', '\u16B2': 'C', '\u16DE': 'D', '\u16D6': 'E',
  '\u16A0': 'F', '\u16B7': 'G', '\u16BB': 'H', '\u16C1': 'I', '\u16C3': 'J',
  '\u16DA': 'L', '\u16D7': 'M', '\u16BE': 'N', '\u16DF': 'O', '\u16C8': 'P',
  '\u16B1': 'R', '\u16CA': 'S', '\u16CF': 'T', '\u16A2': 'U', '\u16B9': 'V',
  '\u16C9': 'X', '\u16C7': 'Z'
};

export const ALPHA_TO_RUNE: Record<string, string> = {};
Object.entries(RUNE_TO_ALPHA).forEach(([rune, alpha]) => {
  ALPHA_TO_RUNE[alpha] = rune;
});

export function applyRoke(text: string): string {
  // 保持大写，依靠字体渲染
  return text.toUpperCase();
}

export function decodeRunic(text: string): string {
  // 将真正的 Unicode 符文转回英文
  return text.split('').map(char => RUNE_TO_ALPHA[char] || char).join('');
}

export async function translateText(text: string, toChinese: boolean = false, onStatusChange?: (show: boolean) => void): Promise<string> {
  if (!text) return '';
  
  onStatusChange?.(true);
  try {
    const langPair = toChinese ? 'en|zh-CN' : 'zh-CN|en';
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`);
    const data = await res.json();
    return data.responseData.translatedText;
  } catch (e) {
    console.error('Translation failed', e);
    return text;
  } finally {
    onStatusChange?.(false);
  }
}
