const enhancer = require("./enhancer.js");
// test away!

item = {
    name: "Psionic Blade",
    durability: 90,
    enhancement: 2,
};

describe("testing to see if enhancer works", () => {
    test("repaired", () => {
        //name prop is returned
        expect(enhancer.repair(item)).toHaveProperty("name");
        //durability prop is returned
        expect(enhancer.repair(item)).toHaveProperty("durability");
        //enhancement prop is returned
        expect(enhancer.repair(item)).toHaveProperty("enhancement");
        //returns the item at durability 100
        expect(enhancer.repair(item).durability).toEqual(100);
        //returns a new item, not the old one.
        expect(enhancer.repair(item)).not.toBe(item);
    });
    describe("testing to see if enhancement works as intended", () => {
        test("succeeded properties show", () => {
            expect(enhancer.repair(item)).toHaveProperty("name");
            expect(enhancer.repair(item)).toHaveProperty("durability");
            expect(enhancer.repair(item)).toHaveProperty("enhancement");
        });
        test("if succeeded raises the enhancement", () => {
            const successfulEnhance = enhancer.succeed(item);
            const originalEnhancement = item.enhancement;
            if (item.enhancement === 20) {
                expect(successfulEnhance.enhancement).toEqual(
                    originalEnhancement
                );
            } else {
                expect(successfulEnhance.enhancement).toEqual(
                    originalEnhancement + 1
                );
            }
            expect(enhancer.succeed(item).enhancement).toBeLessThanOrEqual(20);
        });
    });

    describe("Fail works", () => {
        test("propersties show", () => {
            expect(enhancer.fail(item)).toHaveProperty("name");
            expect(enhancer.fail(item)).toHaveProperty("durability");
            expect(enhancer.fail(item)).toHaveProperty("enhancement");
        });
        test("fail functionality", () => {
            if (item.enhancement < 15) {
                expect(enhancer.fail(item).durability).toEqual(
                    item.durability - 5
                );
            } else if (item.enhancement === 15) {
                expect(enhancer.fail(item).durability).toEqual(
                    item.durability - 10
                );
            } else if (item.enhancement >= 16) {
                expect(enhancer.fail(item).durability).toEqual(
                    item.durability - 10
                );
            } else if (item.enhancement >= 16) {
                expect(enhancer.fail(item).enhancement).toEqual(
                    item.ehancement - 1
                );
            }
        });
    });
    describe("STRETCH get works", () => {
        test("get shows properties", () => {
            expect(enhancer.get(item)).toHaveProperty("name");
            expect(enhancer.get(item)).toHaveProperty("durability");
            expect(enhancer.get(item)).toHaveProperty("enhancement");
        });
        test("the get method returns the correct string", () => {
            if (item.durability === 0) {
                expect(enhancer.get(item)).toBe(item);
            } else if (item.enhancement > 0) {
                expect(enhancer.get(item).name).toBe("[+2] Psionic Blade");
            }
        });
    });
});
