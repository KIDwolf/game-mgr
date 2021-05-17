import { defineComponent, reactive, watch } from 'vue';
import { game } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import moment from 'moment';



export default defineComponent({
    props: {
        show: Boolean,
        game: Object,
    },
    setup(props, context) {
        const editForm = reactive({
            name: '',
            price: 0,
            author: '',
            publishDate: 0,
            classify: '',
        })


        const close = () => {
            context.emit('update:show', false);
        };

        watch(() => props.game, (current) => {
            Object.assign(editForm, current);
            editForm.publishDate = moment(Number(editForm.publishDate));
        });

        const submit = async () => {
            const res = await game.update({
                id: props.game._id,
                name: editForm.name,
                price: editForm.price,
                author: editForm.author,
                publishDate: editForm.publishDate.valueOf(),
                classify: editForm.classify,
            });

            result(res)
                .success(({ data, msg }) => {
                    context.emit('update', data);
                    Object.assign(props.game, data);
                    message.success(msg);
                    close();
                });
        };

        return {
            editForm,
            submit,
            props,
            close,
        };
    },
});