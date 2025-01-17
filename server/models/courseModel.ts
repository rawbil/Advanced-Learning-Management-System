import mongoose, { Document, Schema, Model } from "mongoose";

interface IComment extends Document {
  user: object;
  comment: string;
  commentReplies: IComment[];
}

interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData;
  ratings?: number;
  purchased?: number;
}

//review schema
const reviewSchema: Schema<IReview> = new mongoose.Schema({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
  },
});

//link schema
const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

//comment schema
const commentSchema = new Schema<IComment>({
  user: Object,
  comment: String,
  commentReplies: [Object],
});

//course data schema
const courseDataSchema = new Schema<ICourseData>({
  title: String,
  description: String,
  videoUrl: String,
  videoThumbnail: String,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

//courseSchema
const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  estimatedPrice: Number,

  thumbnail: {
    type: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    required: true,
  },

  tags: {
    type: String,
    required: true,
  },

  level: {
    type: String,
    required: true,
  },

  demoUrl: {
    type: String,
    required: true,
  },

  benefits: [
    {
      title: String,
    },
  ],

  prerequisites: [
    {
      title: String,
    },
  ],

  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  ratings: {
    type: Number,
    default: 0,
  },

  purchased: {
    type: Number,
    default: 0,
  },
});

const courseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default courseModel
