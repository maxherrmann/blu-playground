export default async function delay(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}