export enum DefaultTypes {
  hidden = '@@default/hidden',
  loading = '@@default/loading',
  drawer = '@@default/drawer',
  message = '@@default/message',
  reset = '@@default/reset',
  token = '@@default/token',
  free_json = '@@default/free_json',
}

export enum UserTypes {
  me = '@@user/me',
  destroy_employe = '@@user/destroy_employe',
  destroy_employe_many = '@@user/destroy_employe_many',
  update_employe = '@@user/update_employe',
  sort_employe = '@@user/sort_employe',
  add_employe = '@@user/add_employe',
  update_accounts = '@@user/updated_accounts',
  search_employe = '@@user/search_employe',
}

export enum ProductType {
  list_product = '@@product/list_product',
  list_category = '@@product/list_category',
  create_category = '@@product/create_category',
  destroy_category = '@@product/destory_category',
  put_category = '@@product/put_category',
  create_product = '@@product/create_product',
  destroy_product = '@@product/destroy_product',
  put_product = '@@product/put_product',
  pull_product = '@@product/pull_product',
  pull_category = '@@product/pull_category',
  loading_product = '@@product/loading_product',
  loading_category = '@@product/loading_category',
}
