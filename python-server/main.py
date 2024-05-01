from fastapi import FastAPI, File, UploadFile, HTTPException
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.preprocessing import image

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


async def read_image_from_path(image_path):
    try:
        with open(image_path, 'rb') as file:
            img = Image.open(file)
            preprocessed_img = preprocess_image(img)
            return preprocessed_img
    except Exception as e:
        print("Error reading or preprocessing image:", e)
        return None
    

@app.get('/')
async def fun():
    return "Hello world"

@app.get('/predictColor')
async def predict():
    
    image_path = '../server/uploads/test_image.jpg'
    img = await read_image_from_path(image_path)

    # Resize image to fit the model's input shape
    img = image.load_img(image_path, target_size=(224, 224))
    input_tensor = image.img_to_array(img)
    input_tensor = np.expand_dims(img, axis=0).astype(np.float32)
    # input_tensor = tf.image.resize(input_tensor, [224, 224])
    input_tensor = input_tensor / 255.0

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
