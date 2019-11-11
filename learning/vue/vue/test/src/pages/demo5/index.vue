<template>
  <div>
    <div>class与style绑定</div>
    <div>
      <div :class="{ active: isActive, 'text-danger': hasError }"></div>
      <div :class="classObj"></div>
      <div :class="[classNameA, classNameB]"></div>
    </div>
    <div>
      <div :style="{ color: colorActive, 'font-size': fontSize }"></div>
      <div :style="styleObj"></div>
      <div :style="[style1, style2]"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      hasError: true,
      classObj: {
        active: true,
        'text-danger': false
      },
      classNameA: 'active',
      classNameB: 'text-danger',

      colorActive: 'red',
      fontSize: '13px',
      styleObj: {
        'font-size': '14px',
        color: 'red'
      },
      style1: { 'font-size': '15px' },
      style2: { color: 'red' }
    };
  }
};
</script>
