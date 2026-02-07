import api from "../src/api";

const response = await api.handle(new Request("http://localhost/api/docs/json"));
const schema = await response.json();

await Bun.write("generated/schema.json", JSON.stringify(schema, null, 2));
console.log("✅ OpenAPI schema generated at generated/schema.json");
