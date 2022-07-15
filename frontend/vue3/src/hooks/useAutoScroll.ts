import { Ref, ref, onMounted, onUnmounted } from 'vue';

export function useAutoScroll(): [Ref<HTMLElement | null>, () => void] {
  const ScrollGapTime = 100; //滚动间隔
  const ScrollDom = ref<HTMLElement | null>(null);
  let ScrollTimer: NodeJS.Timer | null = null;

  const Scroll = () => {
    if (ScrollDom.value !== null && ScrollTimer === null) {
      ScrollTimer = setInterval(() => {
        ScrollDom.value!.scrollTo({
          top: ScrollDom.value!.scrollTop + 1,
          behavior: 'smooth',
        });
      }, ScrollGapTime);
    }
  };

  const RestartScroll = () => {
    clearInterval(ScrollTimer!);
    ScrollTimer = null;
    ScrollDom.value!.scrollTop = 0;
    setTimeout(() => {
      Scroll();
    }, 1000);
  };

  onMounted(() => {
    if (!ScrollDom.value) return;
    Scroll();
    ScrollDom.value!.onmouseover = () => {
      clearInterval(ScrollTimer!);
      ScrollTimer = null;
    };
    ScrollDom.value!.onmouseout = () => {
      Scroll();
    };
  });

  onUnmounted(() => {
    clearInterval(ScrollTimer!);
    ScrollTimer = null;
  });

  return [ScrollDom, RestartScroll];
}
