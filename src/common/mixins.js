import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemImgListenerMixin = {
  data() {
    return {
      method: null
    };
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.method = () => {
      refresh();
    };
    this.$bus.$on('imageLoad', this.method);
  }
};

export const BackTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 200);
    }
  }
};
