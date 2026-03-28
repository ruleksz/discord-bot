const express = require("express");
const app = express();

app.use(express.json());

app.post("/github", async (req, res) => {
    const event = req.headers["x-github-event"];
    console.log("EVENT:", event);
    console.log("BODY:", req.body);
    const payload = req.body;

    const client = global.discordClient;

    try {

        // PUSH (COMMITS)
        if (event === "push") {
            const channel = await client.channels.fetch(
                process.env.COMMIT_CHANNEL
            );

            payload.commits.forEach(commit => {
                channel.send(`
🧾 **New Commit**
📦 Repo: ${payload.repository.name}
👤 Author: ${commit.author.name}
💬 Message: ${commit.message}
🔗 ${commit.url}
`);
            });
        }

        // REPO CREATED (GitHub App)
        if (event === "installation_repositories") {
            const channel = await client.channels.fetch(
                process.env.REPO_CHANNEL
            );

            payload.repositories_added.forEach(repo => {
                channel.send(`
                📦 **Repository Created**
                Name: ${repo.name}
                URL: ${repo.html_url}
                `);
            });
        }

        if (event === "repository") {
            const channel = await client.channels.fetch(
                process.env.REPO_CHANNEL
            );

            channel.send(`
📦 Repository Created
Name: ${payload.repository.name}
URL: ${payload.repository.html_url}
`);
        }

        // PULL REQUEST
        if (event === "pull_request" && payload.action === "opened") {
            const channel = await client.channels.fetch(
                process.env.PR_CHANNEL
            );

            channel.send(`
🔀 **Pull Request Opened**
Repo: ${payload.repository.name}
Title: ${payload.pull_request.title}
Author: ${payload.pull_request.user.login}
URL: ${payload.pull_request.html_url}
`);
        }

        // ISSUE
        if (event === "issues" && payload.action === "opened") {
            const channel = await client.channels.fetch(
                process.env.ISSUE_CHANNEL
            );

            channel.send(`
🐛 **Issue Created**
Repo: ${payload.repository.name}
Title: ${payload.issue.title}
URL: ${payload.issue.html_url}
`);
        }

    } catch (err) {
        console.error(err);
    }

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log("GitHub webhook running on port 3000");
});