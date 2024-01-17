export default interface UpdateNoteRequest {
    title: string,
    notite: string,
    materie: string,
    tag: string,
    userId: number,
    isTrash: boolean,
    noteId: number
}