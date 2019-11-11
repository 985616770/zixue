<template>
  <div>
    <div>
      vue-router
    </div>

    <router-link to="/demo11">demo9</router-link>

    <router-link
      :to="{ name: 'demo11', params: { userId: 123 },query:{plan:'sss'} }"
    >123</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
