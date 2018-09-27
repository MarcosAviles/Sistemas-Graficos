/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package practica1;

import com.sun.j3d.utils.geometry.Primitive;
import com.sun.j3d.utils.geometry.Sphere;
import com.sun.j3d.utils.image.TextureLoader;
import javax.media.j3d.AmbientLight;
import javax.media.j3d.Appearance;
import javax.media.j3d.Background;
import javax.media.j3d.BoundingSphere;
import javax.media.j3d.BranchGroup;
import javax.media.j3d.Light;
import javax.media.j3d.Material;
import javax.media.j3d.PolygonAttributes;
import javax.media.j3d.SpotLight;
import javax.media.j3d.Texture;
import javax.media.j3d.TextureAttributes;
import javax.media.j3d.TransformGroup;
import javax.vecmath.Color3f;
import javax.vecmath.Point3d;
import javax.vecmath.Point3f;
import javax.vecmath.Vector3f;

/**
 *
 * @author Marcos
 */
public class Estrella extends BranchGroup {
    private Appearance appearance;
    private Sphere sphere;
    private Material material;
    private Texture texture;
    private BranchGroup root;
    private Planeta mercurio;
    private Planeta venus;
    private Planeta tierra;
    private Planeta marte;
    private Planeta jupiter;
    
    public Estrella(String ruta){
        
        createBackground(ruta);
        
        mercurio = new Planeta("imagenes/mercurio.jpg",1000);
        mercurio.mover(3, 0, 0);
        this.addChild(mercurio.getRaiz());
        
        venus=new Planeta("imagenes/venus.jpg",1000);
        venus.mover(6, 0, 0);
        this.addChild(venus.getRaiz());
        
        tierra = new Planeta("imagenes/tierra.jpg",1000);
        tierra.mover(9, 0, 0);
        tierra.addSatelite("imagenes/luna.jpg", 1000,1,0,0);
        this.addChild(tierra.getRaiz());
        
        marte = new Planeta("imagenes/marte.jpg",1000);
        marte.mover(15,0,0);
        marte.addSatelite("imagenes/fobos.jpg",1000,1,0,0);
        marte.addSatelite("imagenes/deimos.jpg",1000,3,0,0);
        this.addChild(marte.getRaiz());
        
        jupiter= new Planeta("imagenes/jupiter.jpg",1000);
        jupiter.mover(23,0,0);
        jupiter.addSatelite("imagenes/lo.jpg",1000,1,0,0);
        jupiter.addSatelite("imagenes/europa.jpg",1000,3,0,0);
        jupiter.addSatelite("imagenes/calisto.jpg",1000,5,0,0);
        this.addChild(jupiter.getRaiz());
        
        
        
    }
    
    public BranchGroup getRaiz(){
        return this;
    }
    
    
    private void createBackground(String ruta){
        // Se crea e l objeto para e l fondo y
        // se l e asigna un área de i n f l u e n c i a
        Background backgroundNode = new Background() ;
        backgroundNode.setApplicationBounds(new BoundingSphere(new Point3d(0.0,0.0,0.0), 1000.0));
        // Se crea un aspecto basado en l a t e x t u r a a mostrar
        appearance = new Appearance ( ) ;
        
        material =new Material(
        new Color3f (0.20f, 0.20f, 0.20f),   
        new Color3f (1f, 1f, 1f),  
        new Color3f (1f, 1f, 1f),   
        new Color3f (0f, 0f, 0f),  
        10f);
        
        material.setLightingEnable(true);
        appearance.setMaterial(material);
        
        texture = new TextureLoader ( ruta, null).getTexture ();
        TextureAttributes atributos = new TextureAttributes();
        
        atributos.setTextureMode(TextureAttributes.MODULATE);
        appearance.setTextureAttributes (atributos);
        appearance.setTexture (texture);
        
        appearance.setPolygonAttributes(new PolygonAttributes (PolygonAttributes.POLYGON_FILL, PolygonAttributes.CULL_BACK, 0.0f)); 
        // Se hace l a esfera i n d i c ándole :
        // Que genere coordenadas de t e x t u r a
        // Que genere las normales hacia adentro
        sphere = new Sphere (1.0f,Primitive.GENERATE_TEXTURE_COORDS | Primitive.GENERATE_NORMALS,100, appearance );
        // Se crea l a rama para l a geometr í a del fondo ,
        root = new BranchGroup ( ) ;
        // Se l e añade l a esfera
        this.addChild (sphere) ;
        // Y se establece como geometr í a del objeto background
        backgroundNode.setGeometry( root ) ;
        // Finalmente se crea e l BranchGroup para devolver e l Background
        this.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
    }
    
    public Sphere getSphere(){
        return this.sphere;
    }
    
    
}
