const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const PORT = 3000;

const server = http.createServer(async (req, res) => {

    if (req.method === "POST" && req.url === "/api/chat") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            try {
                const { question } = JSON.parse(body);

                const response = await fetch(
                    "https://router.huggingface.co/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            model: "openai/gpt-oss-120b",
                            messages: [
                                {
                                    role: "system",
                                    content:
                                        "You are StudySphere AI, a friendly study assistant. Explain concepts clearly and simply for students."
                                },
                                {
                                    role: "user",
                                    content: question
                                }
                            ],
                            max_tokens: 300
                        })
                    }
                );

                const data = await response.json();

                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });

                res.end(JSON.stringify(data));

            } catch (error) {

                console.error(error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    error: "AI connection failed."
                }));
            }
        });

        return;
    }

    // Serve website files
    let filePath = req.url === "/"
        ? path.join(__dirname, "index.html")
        : path.join(__dirname, req.url);

    const ext = path.extname(filePath);

    const types = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript"
    };

    fs.readFile(filePath, (err, content) => {

        if (err) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": types[ext] || "text/plain"
        });

        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`StudySphere running at http://localhost:${PORT}`);
});