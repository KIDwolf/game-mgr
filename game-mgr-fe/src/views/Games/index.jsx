import { defineComponent, ref, onMounted } from 'vue';
import { game } from '@/service';
import { message, Modal, Input } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';

export default defineComponent({
    components: {
        AddOne,
        Update,
    },
    setup() {
        const columns = [
            {
                title: '名字',
                dataIndex: 'name',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '库存',
                slots: {
                    customRender: 'count',
                },
            },
            {
                title: '发行日期',
                dataIndex: 'publishDate',
                slots: {
                    customRender: 'publishDate',
                },
            },
            {
                title: '分类',
                dataIndex: 'classify',
            },
            {
                title: '操作',
                slots: {
                    customRender: 'actions',
                },
            },


        ];


        const show = ref(false);
        const showUpdateModal = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false);
        const curEditGame = ref({});
        //获取游戏列表
        const getList = async () => {
            const res = await game.list({
                page: curPage.value,
                size: 10,
                keyword: keyword.value,
            });

            result(res)
                .success(({ data }) => {
                    const { list: l, total: t } = data;
                    list.value = l;
                    total.value = t;
                });
        };

        onMounted(async () => {
            getList();
        });
        //设置页码
        const setPage = (page) => {
            curPage.value = page;

            getList();
        };

        //进行搜索
        const onSearch = () => {
            getList();
            isSearch.value = Boolean(keyword.value);
        };

        //回到全部列表
        const backAll = () => {
            keyword.value = '';
            isSearch.value = false;
            getList();
        };
        //删除一本书籍
        const remove = async ({ text: record }) => {
            const { _id } = record;

            const res = await game.remove(_id)

            result(res)
                .success(({ msg }) => {
                    message.success(msg);

                    //  const idx = list.value.findIndex((item) => {
                    //    return item._id === _id;
                    // });

                    // list.value.splice(idx, 1);
                    getList();
                });
        };

        const updateCount = (type, record) => {

            let word = '增加';

            if (type === 'OUT_COUNT') {
                word = '减少';
            }

            Modal.confirm({
                title: `要${word}多少库存`,
                content: (
                    <div>
                        <Input class="__game_input_count" />
                    </div>
                ),
                onOk: async () => {
                    const el = document.querySelector('.__game_input_count');
                    let num = el.value;

                    const res = await game.updateCount({
                        id: record._id,
                        num,
                        type,
                    });

                    result(res)
                        .success((data) => {
                            if (type === type) {
                                num = Math.abs(num);
                            } else {
                                num = -Math.abs(num);
                            }

                            const one = list.value.find((item) => {
                                return item._id === record._id;
                            });

                            if (one) {
                                one.count = one.count + num;

                                message.success(`成功${word} ${Math.abs(num)} 个游戏`);
                            }
                        });
                },
            });
        };

        const update = ({ record }) => {
            showUpdateModal.value = true;
            curEditGame.value = record;
        };

        const updateCurGame = (newData) => {
            Object.assign(curEditGame.value, newData);
        };

        return {
            columns,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            backAll,
            isSearch,
            remove,
            updateCount,
            showUpdateModal,
            update,
            curEditGame,
            updateCurGame,
        };
    },
});