import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditTeam } from "@/hooks/teams/use-edit-team";
import { useGetTeam } from "@/hooks/teams/use-get-team";

import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface TeamProps {
  id?: string;
  name: string;
  slug: string;
  league: string;
  coach: string;
  city: string;
  stadium: string;
  country: string;
}

export default function TeamEdit() {
  const params = useParams();
  const { data: team } = useGetTeam(params.id as string);
  const { mutate: editTeam, isPending } = useEditTeam();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TeamProps>();

  const onSubmit: SubmitHandler<TeamProps> = (data: TeamProps) => {
    editTeam({
      id: team!.id,
      ...data,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Navigation
        link={"/teams/" + params.id}
        linkText="Time"
        currentText="Edição"
      />

      {team && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3">
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium uppercase">
                Nome
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Nome"
                defaultValue={team.name}
                className="w-full rounded border px-4 py-2 outline-none"
                {...register("name", { required: "Campo obrigatório" })}
              />
              {errors.name?.type === "required" && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </fieldset>
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="slug" className="text-sm font-medium uppercase">
                Slug
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                placeholder="Slug"
                defaultValue={team.slug}
                className="w-full rounded border px-4 py-2 outline-none"
                {...register("slug", { required: "Campo obrigatório" })}
              />
              {errors.slug && (
                <p className="text-xs text-red-500">{errors.slug.message}</p>
              )}
            </fieldset>
          </div>

          <div className="flex items-center gap-3">
            <fieldset className="flex w-full flex-col gap-1">
              <label
                htmlFor="stadium"
                className="text-sm font-medium uppercase"
              >
                Estadio
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                id="stadium"
                placeholder="Estadio"
                defaultValue={team.stadium}
                className="w-full rounded border px-4 py-2 outline-none"
                {...register("stadium", { required: "Campo obrigatório" })}
              />
              {errors.stadium && (
                <p className="text-xs text-red-500">{errors.stadium.message}</p>
              )}
            </fieldset>
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="city" className="text-sm font-medium uppercase">
                Cidade
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                placeholder="Cidade"
                defaultValue={team.city}
                className="w-full rounded border px-4 py-2 outline-none"
                {...register("city", { required: "Campo obrigatório" })}
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </fieldset>
          </div>

          <div className="flex items-center gap-3">
            <fieldset className="flex w-full flex-col gap-1">
              <label
                htmlFor="country"
                className="text-sm font-medium uppercase"
              >
                País
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                placeholder="País"
                defaultValue={team.country}
                className="w-full rounded border px-4 py-2 outline-none"
                {...register("country", { required: "Campo obrigatório" })}
              />
              {errors.country && (
                <p className="text-xs text-red-500">{errors.country.message}</p>
              )}
            </fieldset>
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="coach" className="text-sm font-medium uppercase">
                Treinador
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                id="coach"
                placeholder="Treinador"
                defaultValue={team.coach}
                className="w-full rounded border px-4 py-2 outline-none"
                {...register("coach", { required: "Campo obrigatório" })}
              />
              {errors.coach && (
                <p className="text-xs text-red-500">{errors.coach.message}</p>
              )}
            </fieldset>
          </div>

          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="league" className="text-sm font-medium uppercase">
              Liga
              <span className="ml-1 text-red-500">*</span>
            </label>
            <Select
              onValueChange={(value) =>
                setValue("league", value, { shouldValidate: true })
              }
              {...register("league", { required: "Campo obrigatório" })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Liga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NBA">NBA</SelectItem>
                <SelectItem value="WNBA">WNBA</SelectItem>
              </SelectContent>
            </Select>
            {errors.league && (
              <p className="text-xs text-red-500">{errors.league.message}</p>
            )}
          </fieldset>
          <div className="flex items-center justify-end gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Criando..." : "Editar time"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
