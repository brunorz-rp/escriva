import fs from "fs";

export default function CSVhandler() {
	try {
		const filePath = "./public/data.csv"; // Path to your CSV file
		const fileContent = fs.readFileSync(filePath, "utf8");

		const lines = fileContent.split("\n");
		const headers = lines[0].split(",");

		const data = lines.slice(1).map((line) => {
			const values = line.split(",");
			return headers.reduce((obj, header, index) => {
				obj[header.trim()] = values[index] ? values[index].trim() : "";
				return obj;
			}, {});
		});

		console.log(data);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
