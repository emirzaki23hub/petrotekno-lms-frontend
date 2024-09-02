import { getData, postData, putData } from "@/lib/fetch";
import {
  Elearning,
  Module,
  QuizQuestion,
  Section,
  Training,
  TrainingProgramData,
  TrainingSessionData,
  Webinar,
} from "@/types";
import { BaseResponse } from "@/types/auth";

// Define the structure of a single webinar

const getTrainingList = (token: string, domain: string, page?: number) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = `/company/trainings`;

  return getData<BaseResponse<Training>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const getTrainingDetailList = (
  token: string,
  domain: string,
  trainingId: string,
  page?: number
) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/trainings/${trainingId}`;

  return getData<BaseResponse<TrainingProgramData>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const getModuleList = (token: string, domain: string) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = `/company/module`;

  return getData<BaseResponse<Module[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const getSection = (token: string, domain: string, slug: number) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = `/company/module/${slug}`;

  return getData<BaseResponse<Section[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const getTrainingSessionQuiz = (
  token: string,
  domain: string,
  trainingClassId: string,
  trainingSessionId: string,
  trainingSectionId: string
) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  const url = `/company/trainings/${trainingClassId}/sessions/${trainingSessionId}/sections/${trainingSectionId}/quiz`;

  return getData<BaseResponse<QuizQuestion[]>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const getTrainingSessionDetail = (
  token: string,
  domain: string,
  trainingClassId: string,
  trainingSessionId: string
) => {
  if (!token) {
    throw new Error("No authentication token provided. Please log in.");
  }

  // Construct the URL, adding the page parameter only if page > 1
  const url = `/company/trainings/${trainingClassId}/sessions/${trainingSessionId}`;

  return getData<BaseResponse<TrainingSessionData>>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Company": domain,
    },
  });
};

const postPostSubmitQuiz = (body: {
  token: string;
  domain: string;
  trainingClassId: string;
  trainingSessionId: string;
  trainingSectionId: string;
  answers: {
    question_id: string;
    answer_id: string;
  }[];
}) => {
  return postData<BaseResponse>(
    `/company/trainings/${body.trainingClassId}/sessions/${body.trainingSessionId}/sections/${body.trainingSectionId}/quiz`,
    {
      answers: body.answers,
    },
    {
      headers: {
        "X-Company": body.domain,
        Authorization: `Bearer ${body.token}`,
      },
    }
  );
};

const postTrainingSessionFinish = (body: {
  token: string;
  domain: string;
  trainingClassId: string;
  trainingSessionId: string;
}) => {
  return postData<BaseResponse>(
    `/company/trainings/${body.trainingClassId}/sessions/${body.trainingSessionId}/finish`,
    {},

    {
      headers: {
        "X-Company": body.domain,
        Authorization: `Bearer ${body.token}`,
      },
    }
  );
};

export const restTraining = {
  getTrainingList,
  getTrainingDetailList,
  getModuleList,
  getSection,
  getTrainingSessionDetail,
  getTrainingSessionQuiz,
  postPostSubmitQuiz,
  postTrainingSessionFinish,
};
