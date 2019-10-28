<template>
  <div class="app3_page_a">this is Page {{page}}</div>
</template>
<script>
export default {
  data() {
    return {
      page: 'A',
    };
  },
};
</script>
<style>
.app3_page_a {
  font-size: 18px;
}
</style>