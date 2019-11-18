<template>
  <div>
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
    <!-- 编辑页面 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
// import axios from 'axios';
import { ContactList, Toast, ContactEdit, Popup } from 'vant';

export default {
  components: {
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup,
  },
  data() {
    return {
      list: [],
      instance: null,
      showEdit: false,
      editingContact: {},
      isEdit: false,
    };
  },
  created() {
    this.getList();
  },

  methods: {
    async getList() {
      let res = await this.$Http.getContactList();
      this.list = res.data;
    },

    // 添加联系人
    onAdd() {
      this.showEdit = true;
      this.isEdit = false;
    },

    // 编辑联系人
    onEdit(info) {
      this.showEdit = true;
      this.isEdit = true;
      this.editingContact = info;
    },
    // 保存
    async onSave(info) {
      if (this.isEdit) {
        // 编辑保存
        let res = await this.$Http.editContact(info);

        if (res.code === 200) {
          Toast.success('编辑成功');
          this.showEdit = false;
          this.getList();
          return;
        }
      } else {
        // 新建保存
        let res = await this.$Http.newContactForm(info, true);

        if (res.code === 200) {
          Toast.success('新建成功');
          this.showEdit = false;
          this.getList();
          return;
        }
      }
    },
    // 删除
    async onDelete(info) {
      let res = await this.$Http.delContact({ id: info.id });

      if (res.code === 200) {
        Toast.success('删除成功');
        this.showEdit = false;
        this.getList();
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
