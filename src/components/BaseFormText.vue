<template>
<label class="form__label" for="#"><!-- нельзя инпут от лайбл отделить -->
  <BaseFormField :error="error" :title="title">
    <input class="form__input" :type="type" v-model="dataValue" :placeholder="placeholder">
  </BaseFormField>
</label>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: {
    type: {
      default: 'text',
    },
  },
};
</script>
