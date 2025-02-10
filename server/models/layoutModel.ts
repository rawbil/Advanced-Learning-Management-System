import mongoose, { Schema, Document, Model } from "mongoose";

interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

export interface BannerImage extends Document {
  public_id: string;
  url: string;
}

export interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: Category[];
  banner: {
    image: BannerImage;
    title: string;
    subTitle: string;
  };
}

//faq schema
const faqSchema = new Schema<FaqItem>({
  question: { type: String },
  answer: { type: String },
});

//category schema
const categorySchema = new Schema<Category>({
  title: String,
});

//banner image schema
const bannerImageSchema = new Schema<BannerImage>({
  public_id: String,
  url: String,
});

//layout schema
const layoutSchema = new Schema<Layout>({
  type: {
    type: String,
  },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: String,
    subTitle: String,
  },
});

const layoutModel: Model<Layout> = mongoose.model("Layout", layoutSchema);
export default layoutModel;
