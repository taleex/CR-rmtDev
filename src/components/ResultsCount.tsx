
type resultsCountProps = {
  totalNumberOfResults: number;
};

export default function ResultsCount({ totalNumberOfResults}: resultsCountProps) {
  return <p className="count"><span className="u-bold">{totalNumberOfResults}</span> results</p>;
}
