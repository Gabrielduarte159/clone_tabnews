function status(request, response) {
  response.status(200).json({ message: "Alunos do curso.dev são descolados" });
}

export default status;
