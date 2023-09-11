import { reactive, ref } from 'vue';

interface Options<T = any> {
  // api
  apiFn: (params: any) => Promise<App.RequestTableResult>;
  // api请求参数
  apiParams?: Recordable;
  // api返回值不是约定的TableResponse的处理
  callback?: (data: any) => App.TableResult<T>;
  // 显示分页数据
  isPageable?: boolean;
  // 立即执行getList函数
  immediate?: boolean;
}

export const useTable = <T = any>(options: Options) => {
  const tableData = ref<T[]>([]);
  const loading = ref<boolean>(false);
  const page = reactive({
    page: 1,
    pageSize: 10,
    total: 10
  });

  const getList = async () => {
    loading.value = true;
    const isPageable = options.isPageable ?? true;
    const pageParams = isPageable ? { page: page.page, pageSize: page.pageSize } : {};
    const totalParams = Object.assign({}, options.apiParams, pageParams);
    let { data } = await options.apiFn(totalParams).finally(() => (loading.value = false));
    options.callback && (data = options.callback(data));
    tableData.value = isPageable ? data.list : data;
    page.total = data.total;
  };

  const handleSizeChange = async (val: number) => {
    page.page = 1;
    page.pageSize = val;
    await getList();
  };

  const handleCurrentChange = async (val: number) => {
    page.pageSize = val;
    await getList();
  };
  if (options.immediate ?? true) getList();

  return {
    tableData,
    page,
    loading,
    getList,
    handleSizeChange,
    handleCurrentChange
  };
};
