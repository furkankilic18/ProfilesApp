import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { api } from "../api/client";

export default function ProfileDetailScreen({ route }) {
  const { id } = route.params;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/profiles/${id}`);
      setProfile(response.data);
    } catch (err) {
      setError("Profil detayları yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Profil bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{profile.name}</Text>

      <Text style={styles.label}>E-posta</Text>
      <Text style={styles.value}>{profile.email}</Text>

      <Text style={styles.label}>Yaş</Text>
      <Text style={styles.value}>{profile.age}</Text>

      {profile.phone && (
        <>
          <Text style={styles.label}>Telefon</Text>
          <Text style={styles.value}>{profile.phone}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
