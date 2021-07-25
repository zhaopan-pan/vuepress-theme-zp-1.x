<template>
  <i class="iconfont" :class="{ [`zpicon-${icon}`]: icon, tags: isTag }">
    <span
      class="ml5"
      @click="clickEv"
      :class="{ 'tag-item': isTag }"
      v-if="!hasSlot && text"
    >
      {{ text || '' }}
    </span>
    <slot v-if="hasSlot" />
  </i>
</template>
<script>
export default {
  name: 'ZpIcon',
  props: {
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
    spanStyle: { type: String, default: '' },
    isTag: { type: Boolean, default: false },
    hasSlot: { type: Boolean, default: false },
    clickEv: { type: Function, default: () => {} },
  },
  computed: {},
  mounted() {},
}
</script>
<style lang="stylus" scoped>

.iconfont {
  display: inline-block;
  line-height: 1.5rem;
}

.tags {
  .tag-item {
    cursor: pointer;

    &.active {
      color: $accentColor;
    }

    &:hover {
      color: $accentColor;
      transform: scale(1.15);
    }
  }
}
</style>
