from fastapi import FastAPI, File, UploadFile, HTTPException
import numpy as np
from PIL import Image
import tensorflow as tf

app = FastAPI()

# Load the TensorFlow Lite model
interpreter = tf.lite.Interpreter(model_path='model_unquant.tflite')
interpreter.allocate_tensors()

# Load labels
with open('labels.txt', 'r') as f:
    labels = f.read().splitlines()

def preprocess_image(image):
    img = Image.open(image)
    img = img.resize((224, 224))  # Resize image to the expected input shape of the model
    img = np.array(img) / 255.0  # Normalize pixel values
    return img

@app.post('/predict')
async def predict(image: UploadFile = File(...)):
    if not image.content_type.startswith('image/'):
        raise HTTPException(status_code=415, detail="Unsupported file type")

    # Preprocess the image
    img = preprocess_image(await image.read())

    # Resize image to fit the model's input shape
    input_tensor = np.expand_dims(img, axis=0).astype(np.float32)

    # Get input and output details
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Set input tensor
    interpreter.set_tensor(input_details[0]['index'], input_tensor)

    # Run inference
    interpreter.invoke()

    # Get output tensor
    output_tensor = interpreter.get_tensor(output_details[0]['index'])

    # Get top 5 predictions
    top_predictions = [
        {'label': labels[i], 'score': float(output_tensor[0][i])}
        for i in np.argsort(output_tensor[0])[::-1][:5]
    ]

    return {'result': top_predictions}
