<template>
  <div>
    <span
      class="single-tag"
      v-for="(item, index) in tagsList"
      :key="index"
      :class="{
        active:
          !justShowTags &&
          (currentTag
            ? currentTag === item.name
            : currentSelectTag === item.name),
      }"
      :style="{ backgroundColor: item.color }"
      @click="clickTag(item.name)"
      >{{ item.name || "" }}</span
    >
  </div>
</template>

<script>
import { goTags } from "@theme/util";
export default {
  name: "TagsItem",
  props: {
    tagsList: {
      type: Array,
      default: () => [],
    },
    justShowTags: {
      type: Boolean,
      default: false,
    },
    currentTag: {
      type: String,
      default: "",
    },
    getArticleListByTag: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      timeLineData: [],
      currentSelectTag: "",
    };
  },
  mounted() {},
  methods: {
    clickTag: function (tagName) {
      if (this.justShowTags) return goTags(tagName);
      this.currentSelectTag = tagName;
      this.getArticleListByTag(tagName);
    },
  },
};
</script>

<style lang="stylus" scoped>
.single-tag {
  padding: 5px 10px;
  margin: 5px;
  border-radius: 4px;
  display: inline-flex;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.9s;

  &:hover {
    transform: scale(1.05);
  }

  &.active {
    transform: scale(1.2);
  }

  .only-one {
    &:first-child {
      margin-left: 0.5rem;
    }

    &.active {
      color: $accentColor;
    }
  }
}
</style>