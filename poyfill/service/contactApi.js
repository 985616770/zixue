const CONTACT_API = {
  //  新建联系人列表
  getContactList: {
    method: 'get',
    url: '/contactList',
  },
  // 新建联系人 form-data
  newContactForm: {
    method: 'post',
    url: '/contact/new/form',
  },
  // 新建联系人 application/json
  newContactJson: {
    method: 'post',
    url: '/contact/new/json',
  },
  // 编辑联系人 put
  editContact: {
    method: 'put',
    url: '/contact/edit',
  },
  // 删除联系人 delete
  delContact: {
    method: 'delete',
    url: '/contact',
  },
};

export default CONTACT_API;
