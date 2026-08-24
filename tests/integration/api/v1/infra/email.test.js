import email from "infra/email.js";
import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();
    await email.send({
      from: "Gabs <gabrielvduarte9@gmail.com>",
      to: "gabrielvduarte9@gmail.com",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "Gabs <gabrielvduarte9@gmail.com>",
      to: "gabrielvduarte9@gmail.com",
      subject: "Ultimo email enviado",
      text: "Corpo do ultimo email.",
    });
    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<gabrielvduarte9@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<gabrielvduarte9@gmail.com>");
    expect(lastEmail.subject).toBe("Ultimo email enviado");
    expect(lastEmail.text).toBe("Corpo do ultimo email.\n");
  });
});
