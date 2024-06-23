import { shallowMount } from "@vue/test-utils"
import RectangleTree from "./RectangleTree.vue"
import { nextTick } from "vue";

describe("RectangleTree", () => {
    const wrapper = shallowMount(RectangleTree);
    const event = {};
    const data = {
        data: {
            data: {
                name: "A",
                description: "This is description of A"
            }
        }
    };
    it("should test the selectedNode when clicked on node", async () => {
        const spyEvent = jest.spyOn(wrapper.vm, 'selectedNode');
        await wrapper.vm.selectedNode(event, data);
        expect(spyEvent).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.showModal).toBe(true);
        expect(wrapper.vm.showData).toStrictEqual({
            name: "A",
            description: "This is description of A"
        });
    });

    it("should test the pop-over modal is exist or not", async () => {
        // default showModal is false
        expect(wrapper.find('#pop-hover').exists()).toBe(false);
        wrapper.vm.showModal = true;
        await nextTick();
        expect(wrapper.find('#pop-hover').exists()).toBe(true);
    });

    it("should test the pop-modal text", async () => {
        await wrapper.vm.selectedNode(event, data);
        expect(wrapper.find('#pop-up-modal').exists()).toBe(true);
        expect(wrapper.find('#pop-up-modal #title').text()).toBe('A');
        expect(wrapper.find('#pop-up-modal #description').text()).toBe('This is description of A');
    })
    
    it("should test the close modal event", async () => {
        const spyCloseModal = jest.spyOn(wrapper.vm, 'closeModal');
        expect(wrapper.find('#close').exists()).toBe(false);
        wrapper.vm.showModal = true;
        await nextTick();
        expect(wrapper.find('#close').exists()).toBe(true);
        await wrapper.find('#close').trigger('click');
        expect(spyCloseModal).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.showModal).toBe(false);
        expect(wrapper.vm.showData).toStrictEqual({});
    });

    it("should test the tree-layout is exist or not", () => {
        expect(wrapper.find('#treeChart').exists()).toBe(true);
    });
});