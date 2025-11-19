const { exec } = require("node:child_process");

let spinner = ["/", "-", "\\", "|"];
let i = 0;

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    process.stdout.write("\n🟢 Postgres está pronto e aceitando conexões.\n");
  }
}

process.stdout.write(
  `🔴 Aguardando Postgres aceitar conexões ${spinner[i++ % spinner.length]}`,
);

checkPostgres();
