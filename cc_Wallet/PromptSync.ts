export function promptSync(question: string): Promise<string> {
    return new Promise((resolve) => {
        let input = '';
        process.stdin.setEncoding('utf8');

        const onData = (chunk: string) => {
            input += chunk;
            if (input.includes('\n')) {
                process.stdin.removeListener('data', onData);
                resolve(input.trim());
            }
        };

        process.stdin.on('data', onData);
    });
}
