import { Debounce } from "@/types/types";
import { useCallback, useRef } from "react";

export const useDebounce = (timeout: number): Debounce => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const debounce: Debounce = useCallback(
        (fn) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                fn();
            }, timeout);
        },
        [timeout]
    );
    return debounce;
}