import { debounce } from "@/utils";

export default function (refValue) {
    return {
        methods: {
            handleChangeMainScroll() {
                this.$bus.$emit("mainScroll", this.$refs[refValue]);
            },
            handleSetMainScroll(scrollTop) {
                if (!scrollTop && scrollTop !== 0) {
                    return;
                }
                this.$refs[refValue].scrollTop = scrollTop;
            },
        },
        mounted() {
            this.$refs[refValue].addEventListener(
                "scroll",
                debounce(this.handleChangeMainScroll, 100)
            );
            this.$bus.$on("setScrollToTop", this.handleSetMainScroll);
        },
        beforeDestroy() {
            this.$bus.$emit("mainScroll");
            this.$refs[refValue].removeEventListener(
                "scroll",
                debounce(this.handleChangeMainScroll, 100)
            );
            this.$bus.$off("setScrollToTop", this.handleSetMainScroll);
        },
    }
}