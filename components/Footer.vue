<template>
  <footer class="footer">
    <span v-if="$themeConfig.record">
      <zp-icon icon="beian" />
      <a :href="$themeConfig.recordLink || '#'">{{ $themeConfig.record }}</a>
    </span>
    <span>
      <zp-icon icon="copyright" />
      <a>
        <span v-if="$themeConfig.author">{{ $themeConfig.author }}</span>
        &nbsp;&nbsp;
        <span
          v-if="
            $themeConfig.startYear &&
            $themeConfig.startYear != new Date().getFullYear()
          "
          >{{ $themeConfig.startYear }} -
        </span>
        {{ new Date().getFullYear() }}
      </a>
    </span>
    <span>
      <zp-icon icon="view" hasSlot title="浏览量">
        <AccessCount />
      </zp-icon>
    </span>
    <p class="cyber-security" v-if="$themeConfig.cyberSecurityRecord">
      <img
        src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
        alt=""
      />
      <a :href="$themeConfig.cyberSecurityLink || '#'">{{
        $themeConfig.cyberSecurityRecord
      }}</a>
    </p>
    <Comments :commentsShow="false" />
  </footer>
</template>

<script>
import ZpIcon from "@theme/components/ZpIcon";
import AccessCount from "@theme/components/Comments/AccessCount";
import Comments from "@theme/components/Comments";

export default {
  name: "Footer",
  components: { ZpIcon, AccessCount, Comments },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
};
</script>
<style lang="stylus" scoped>
.footer
  padding 1.5rem 2.5rem
  border-top 1px solid $borderColor
  text-align center
  color lighten($textColor, 25%)
  p
    margin 0
  a
    font-size 14px
  > span
    margin-left 1rem
    > i
      margin-right 0.5rem
  .cyber-security
    img
      margin-right 0.5rem
      width 20px
      height 20px
      vertical-align middle
    a
      vertical-align middle
@media (max-width $MQMobile)
  .footer
    text-align left !important
    > span
      display block
      margin-left 0
      line-height 2rem
</style>
