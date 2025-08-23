import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedFunction<T extends (...args: any[]) => any>(fn: T, delay = 500) {
	const timeoutRef = useRef<number | null>(null);

	const debouncedFn = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				fn(...args);
			}, delay);
		},
		[fn, delay]
	);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debouncedFn;
}
