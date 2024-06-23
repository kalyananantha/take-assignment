import { shallowMount } from "@vue/test-utils"
import App from "./App.vue"
import RectangleTree from './components/RectangleTree.vue';

describe("App", () => {
    const wrapper = shallowMount(App)
    it("should test the pop-over modal is exist or not", () => {
        expect(wrapper.findComponent(RectangleTree).exists()).toBe(true);
    });
});