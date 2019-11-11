<template>
  <div>
    <div>
      <div>条件渲染</div>
      <div>------------</div>
      <div v-if="ok">yes</div>
      <div v-else-if="!ok">no</div>
      <div v-else>123</div>

      <div v-show="ok">123</div>
    </div>

    <div>
      <div>列表渲染</div>
      <div>------------------</div>
      <ul id="example-1">
        <li v-for="(item, index) in items" :key="index">
          {{ item.message }} = {{ index }}
        </li>
      </ul>
      <ul>
        <li v-for="(value, key) in object" :key="key">{{ key }}的{{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ok: false,
      items: [
        { message: '1' },
        { message: '2' },
        { message: '3' },
        { message: '4' },
        { message: '5 ' }
      ],
      object: {
        f: 'ss',
        n: 'dd'
      }
    };
  }
};
</script>

<style lang="" scoped>
li {
  list-style: none;
}
</style>
