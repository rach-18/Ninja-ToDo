import { useEffect } from "react";
import { useTask } from "../../context/TaskContext";

function AIRephraseModal({
  isRephraseModalOpen,
  setIsRephraseModalOpen,
  original,
  setTaskInfo,
}) {
  const { rephrasedTask } = useTask();

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleSetrephraseTask = () => {
    setTaskInfo((prev) => ({ ...prev, task: rephrasedTask }));
    setIsRephraseModalOpen(false);
  };

  useEffect(() => {
    if (isRephraseModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isRephraseModalOpen]);

  return (
    <>
      {isRephraseModalOpen && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsRephraseModalOpen(false)}
        >
          <div className="flex justify-center items-center h-full">
            <div
              className="bg-white w-1/3 p-5 rounded-lg border-2 border-blue-600"
              onClick={handleModalClick}
            >
              {rephrasedTask !== "" ? (
                <>
                  <p className="font-semibold">Clarified Ninja Task</p>
                  <p>
                    Your task has been refined for maximum clarity and
                    actionability.
                  </p>
                  <p className="font-semibold mt-5">Original Mission:</p>
                  <p>{original}</p>
                  <p className="font-semibold mt-5">Clarified Mission:</p>
                  <p>{rephrasedTask}</p>
                  {rephrasedTask !== "Clarifying Ninja Task..." &&
                  rephrasedTask !==
                    "Failed to clarify the task. Please try again!" ? (
                    <div className="mt-5 flex gap-5 justify-between">
                      <button
                        onClick={handleSetrephraseTask}
                        className="w-full text-center bg-blue-400 text-white py-2 rounded-lg transition-all hover:scale-[1.02]"
                      >
                        Use Clarified Mission
                      </button>
                      <button
                        onClick={() => setIsRephraseModalOpen(false)}
                        className="w-full text-center bg-blue-400 text-white py-2 rounded-lg transition-all hover:scale-[1.02]"
                      >
                        Use Original Mission
                      </button>
                    </div>
                  ) : rephrasedTask ===
                    "Failed to clarify the task. Please try again!" ? (
                    <button
                      onClick={() => setIsRephraseModalOpen(false)}
                      className="w-full text-center bg-blue-400 text-white py-2 rounded-lg transition-all hover:scale-[1.02] mt-5"
                    >
                      Retry
                    </button>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <p>Please enter an input</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIRephraseModal;
