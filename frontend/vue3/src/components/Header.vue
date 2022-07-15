<template>
    <div class="header">
        <img class="imgTitle" src="@/assets/images/Home/Home_Title.png" alt="" v-if="mode === 'image'">
        <img src="@/assets/images/title_bg.png" alt="" class="textTitleBg" v-if="mode === 'text'">
        <div class="textTitle" v-if="mode === 'text'">{{ title === null ? store.headerTitle : title }}</div>
        <img src="@/assets/images/Home/logo.png" alt="" class="logo">
        <div class="datetime">{{ DateTime }}</div>
        <img src="@/assets/images/Home/back_dark.png" alt="" class="back" v-if="showBack">
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineProps, withDefaults, toRefs } from 'vue';
import { useCommonState } from '@/store/common';
import dayjs from 'dayjs';
import { fillZero } from '@/libs/utils';

interface IProps {
    showBack: boolean;
    mode: 'text' | 'image',
    title: string | null;
}

const store = useCommonState();
const props = withDefaults(defineProps<IProps>(), {
    showBack: true,
    mode: 'text',
    title: null
})
const { mode, title, showBack } = toRefs(props)

let DateTimeTimer: NodeJS.Timer
const dayToChinese = (num: number) =>
    ['日', '一', '二', '三', '四', '五', '六'][num];
const getDateTime = () =>
    `${dayjs().year()}年${dayjs().month() + 1}月${dayjs().date()}日 ${fillZero(
        dayjs().hour().toString()
    )}:${fillZero(dayjs().minute().toString())} 周${dayToChinese(
        dayjs().day()
    )}`;
const DateTime = ref(getDateTime());

onMounted(() => {
    if (mode.value === 'text') {
        store.GetHeaderTitle();
    }

    DateTimeTimer = setInterval(() => {
        DateTime.value = getDateTime();
    }, 200);
});

onUnmounted(() => {
    clearInterval(DateTimeTimer);
});
</script>

<style lang="less" scoped>
.header {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: transparent;

    .imgTitle,
    .textTitleBg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        pointer-events: none;
    }

    .textTitle {
        position: absolute;
        top: 7px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 28px;
        letter-spacing: 10px;
        font-family: AlibabaPuHuiTi_2_105_Heavy;
        background-image: linear-gradient(#FFFFFF, #A5D8EA);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .logo {
        position: absolute;
        top: 31px;
        left: 79px;
        width: 149px;
    }

    .datetime {
        position: absolute;
        top: 37px;
        left: 1535px;
        font-family: AlibabaPuHuiTi_2_55_Regular;
        font-size: 14px;
        color: #bedee9;
        letter-spacing: 2px;
        text-align: right;
        font-weight: 400;
    }

    .back {
        pointer-events: all;
        position: absolute;
        top: 32px;
        left: 1782px;
        width: 80px;
        cursor: pointer;
    }
}
</style>