import { useState } from "react";

import { DashboardPage } from "../features/dashboard/DashboardPage";
import { LessonsPage } from "../features/lessons/LessonsPage";
import { TransformerArchitectureLessonPage } from "../features/lessons/transformer-architecture/TransformerArchitectureLessonPage";
import { WhatIsLargeLanguageModelLessonPage } from "../features/lessons/what-is-a-large-language-model/WhatIsLargeLanguageModelLessonPage";
import "../styles/app.css";

type LessonKey = "llm-intro" | "transformer-architecture";

function App() {
  const [view, setView] = useState<"dashboard" | "lessons" | "lesson">(
    "dashboard",
  );
  const [activeLesson, setActiveLesson] = useState<LessonKey>("llm-intro");
  const [lessonReturnView, setLessonReturnView] = useState<"dashboard" | "lessons">(
    "dashboard",
  );

  if (view === "lesson") {
    const sharedProps = {
      onBack: () => setView(lessonReturnView),
      backLabel:
        lessonReturnView === "lessons" ? "Back to Roadmap" : "Back to Dashboard",
    };

    if (activeLesson === "transformer-architecture") {
      return (
        <TransformerArchitectureLessonPage
          {...sharedProps}
          onOpenNextLesson={() => setView("lessons")}
        />
      );
    }

    return (
      <WhatIsLargeLanguageModelLessonPage
        {...sharedProps}
        onOpenNextLesson={() => {
          setActiveLesson("transformer-architecture");
          setView("lesson");
        }}
      />
    );
  }

  if (view === "lessons") {
    return (
      <LessonsPage
        onOpenDashboard={() => setView("dashboard")}
        onOpenLesson={(lessonKey) => {
          setActiveLesson(lessonKey);
          setLessonReturnView("lessons");
          setView("lesson");
        }}
      />
    );
  }

  return (
    <DashboardPage
      onOpenLesson={() => {
        setActiveLesson("llm-intro");
        setLessonReturnView("dashboard");
        setView("lesson");
      }}
      onOpenLessons={() => setView("lessons")}
    />
  );
}

export default App;
