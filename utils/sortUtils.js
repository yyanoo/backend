/**
 * 排序邏輯：先按 title 排序，再按 id 排序
 * - id 個數字排在前面（升序）
 * - 字母型排在後面（字母順序）
 */
export function sortCardData(result) {
  return result.sort((a, b) => {
    // 先按 title 排序
    if (a.title !== b.title) {
      return a.title.localeCompare(b.title);
    }

    // 相同 title，區分數字和字母類型的 id
    const aSuffix = a.id.split("-").pop();
    const bSuffix = b.id.split("-").pop();

    const aNum = parseInt(aSuffix);
    const bNum = parseInt(bSuffix);

    const aIsNum = !isNaN(aNum);
    const bIsNum = !isNaN(bNum);

    // 數字型排在前面（升序），字母型排在後面
    if (aIsNum && bIsNum) {
      // 都是數字，升序排列
      return aNum - bNum;
    } else if (aIsNum) {
      // a 是數字，b 是字母，a 排前面
      return -1;
    } else if (bIsNum) {
      // b 是數字，a 是字母，b 排前面
      return 1;
    } else {
      // 都是字母，按字母順序排
      return aSuffix.localeCompare(bSuffix);
    }
  });
}
