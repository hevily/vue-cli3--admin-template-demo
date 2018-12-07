
<template>
  <div>
    <div v-if="isExternalLink(to)">
      <a :href="to" target="_blank" rel="noopener">
        <slot/>
      </a>
    </div>
    <div v-else>
      <router-link :to="to">
        <slot/>
      </router-link>
    </div>
  </div>
</template>
 
<script>
//  <!-- eslint-disable vue/require-component-is-->
//  <component v-bind="linkProps(to)">
//     <slot/>
//   </component>
import { isExternal } from "@/utils";

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    isExternalLink(routePath) {
      return isExternal(routePath);
    },
    linkProps(url) {
      if (this.isExternalLink(url)) {
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener"
        };
      }
      return {
        is: "router-link",
        to: url
      };
    }
  }
};
</script>
