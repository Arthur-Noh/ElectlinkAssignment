import { useRef } from 'react';

// 지연 발송 로직
// 동일한 요청에 대해서 여러번 반복해서 들어왔을 때, 이전에 있던 시간 이내에 요청이 들어오면
// 이전 요청을 제거하고 신규 요청으로 다시 일정 시간만큼 지연 시키고 수행하도록 훅을 개발했습니다.
export const useDebounce = <T extends any[]>( callback: (...params: T) => void, delay: number ) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    return (...params: T) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        // 시간 이내에 지속 요청이 들어오면 다시 새로운 함수를 콜백으로 넣어줍니다.
        timer.current = setTimeout(() => {
            callback(...params);
            timer.current = null;
        }, delay);
    }
}

export default useDebounce;
