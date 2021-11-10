import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    setup() {
        const props = defineProps({
            to: {
                type: String,
                required: true,
            }
        })
        return (
            <a href={`#${props.to}`}>
                <slot></slot>
            </a>
        )
    },
})