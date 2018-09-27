/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package practica1;

import com.sun.j3d.utils.geometry.Primitive;
import com.sun.j3d.utils.geometry.Sphere;
import com.sun.j3d.utils.image.TextureLoader;
import java.util.ArrayList;
import javax.media.j3d.Alpha;
import javax.media.j3d.Appearance;
import javax.media.j3d.Background;
import javax.media.j3d.BoundingSphere;
import javax.media.j3d.BranchGroup;
import javax.media.j3d.Material;
import javax.media.j3d.RotationInterpolator;
import javax.media.j3d.RotationPathInterpolator;
import javax.media.j3d.Texture;
import javax.media.j3d.TextureAttributes;
import javax.media.j3d.Transform3D;
import javax.media.j3d.TransformGroup;
import javax.vecmath.AxisAngle4f;
import javax.vecmath.Color3f;
import javax.vecmath.Point3d;
import javax.vecmath.Quat4f;
import javax.vecmath.Vector3d;

/**
 *
 * @author Marcos
 */
public class Planeta extends BranchGroup{
    private Appearance appearance;
    private Sphere sphere;
    private Texture texture;
    private Alpha timer;
    private long time;
    private Material material;
    TransformGroup translacion;
    
    public Planeta(String ruta, float aTime){
        createBackground(ruta, aTime);
    }
    
    public void addSatelite(String ruta, float aTime,float x, float y, float z){
        Satelite aux= new Satelite(ruta, aTime);
        aux.mover(x,y,z);
        translacion.addChild(aux);
        //this.addChild(aux.getRaiz());
    }
    
    //EXAMEN
    private void createBackground(String ruta, float aTime){
        // Se crea e l objeto para e l fondo y
        // se l e asigna un área de i n f l u e n c i a
        Background backgroundNode = new Background() ;
        backgroundNode.setApplicationBounds(new BoundingSphere(new Point3d(0.0,0.0,0.0), 10.0));
        // Se crea un aspecto basado en l a t e x t u r a a mostrar
        appearance = new Appearance ( ) ;
        material =new Material(
        new Color3f (0.20f, 0.20f, 0.20f),   
        new Color3f (0f, 0f, 0f),  
        new Color3f (1f, 1f, 1f),   
        new Color3f (0f, 0f, 0f),  
        10f);
        
        material.setLightingEnable(true);
        appearance.setMaterial(material);
        texture = new TextureLoader ( ruta, null).getTexture ();
        TextureAttributes atributos = new TextureAttributes();
        
        atributos.setTextureMode(TextureAttributes.MODULATE);
        appearance.setTextureAttributes (atributos);
        appearance.setTexture(texture);
        // Se hace l a esfera i n d i c ándole :
        // Que genere coordenadas de t e x t u r a
        // Que genere las normales hacia adentro
        sphere = new Sphere (0.5f,Primitive.GENERATE_TEXTURE_COORDS | Primitive.GENERATE_NORMALS_INWARD,100, appearance );
        // Se crea l a rama para l a geometr í a del fondo ,
        //root = new BranchGroup ( ) ;
        // Se l e añade l a esfera
        //this.addChild (sphere) ;
        // Y se establece como geometr í a del objeto background
        backgroundNode.setGeometry( this ) ;
        // Finalmente se crea e l BranchGroup para devolver e l Background
        time=(long) (aTime*1000);
    }
    
    public BranchGroup getRaiz(){
        return this;
    }
   
    // EXAMEN
    public void mover(float x, float y, float z){
        
        // Se crean los objetos de transformaciones
        Transform3D rotacion = new Transform3D();
        Transform3D translation = new Transform3D();
        Transform3D rotacion_orbita = new Transform3D();
        
        // Definimos la translación y se le aplica permisos de escritura
        translation.setTranslation (new Vector3d (x, y, z));
        translacion = new TransformGroup(translation);
        translacion.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
        
        // Preparo las transformacions para las rotaciones y se le aplica permisos
        //rotacion.set(23.5f);
        TransformGroup rotator = new TransformGroup (rotacion);
        rotator.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
        TransformGroup rotator2 = new TransformGroup (rotacion_orbita);
        rotator2.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
        
   
        Alpha alphas = new Alpha(-1, 9000);
        RotationInterpolator interpolator = new RotationInterpolator (alphas, rotator,rotacion,0f,(float) Math.PI*2.0f);
        interpolator.setSchedulingBounds(new BoundingSphere(new Point3d (0.0f, 0.0f, 0.0f), 100.0f));
        
        RotationInterpolator interpolator2 = new RotationInterpolator (alphas, rotator2,rotacion_orbita,0f,(float)/*EXAMEN*/ -Math.PI*2.0f);
        interpolator2.setSchedulingBounds(new BoundingSphere(new Point3d (0.0f, 0.0f, 0.0f), 100.0f));
        
        // Creamos el grafo de transformaciones
        rotator2.addChild(translacion);
        translacion.addChild(rotator);
        rotator.addChild(sphere);
        
        rotator.addChild(interpolator);
        rotator2.addChild(interpolator2);
        addChild(rotator2);
        
    }
    
}
