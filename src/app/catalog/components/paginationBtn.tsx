export default function PaginationBtn({
  submitFunc,
  clickFunc,
  img,
}: {
  submitFunc: (event: React.FormEvent<HTMLFormElement>) => {};
  clickFunc: () => void;
  img: string;
}) {
  return (
    <>
      <form onSubmit={submitFunc}>
        <button
          type="submit"
          id={img}
          onClick={clickFunc}
          className="pagination border-spacing-2 border-2 text-xl border-emerald-900  text-emerald-900 disabled:border-gray-400 disabled:text-gray-400 mx-2 rounded-3xl font-bold w-10 h-10 py-1"
        >
          <i>{img}</i>
        </button>
      </form>
    </>
  );
}
