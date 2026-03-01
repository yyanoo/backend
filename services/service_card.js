import { sortCardData } from "../utils/sortUtils.js";

export function filterCardData(data, filters) {
    let result = data;

    if (filters.title) {
        result = result.filter((item) => item.title?.includes(filters.title));
    }

    if (filters.id) {
        result = result.filter((item) => item.id.includes(filters.id));
    }

    if (filters.color) {
        result = result.filter((item) => item.color.includes(filters.color));
    }

    if (filters.lvl) {
        result = result.filter((item) => item.lvl.includes(filters.lvl));
    }

    return result;
}

export function processCardData(data, filters) {
    try {
        if (!data || data.length === 0) {
            return { success: false, data: null, message: "找不到資料" };
        }

        const filtered = filterCardData(data, filters);

        if (filtered.length === 0) {
            return {
                success: false,
                data: null,
                message: "找不到符合條件的資料",
            };
        }

        const sorted = sortCardData(filtered);

        return { success: true, data: sorted, message: "成功" };
    } catch (err) {
        console.error("處理卡片資料錯誤：", err);
        return {
            success: false,
            data: null,
            message: "伺服器錯誤",
            error: err.message,
        };
    }
}
